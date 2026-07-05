## MINIMAL FIX FOR welcomeHandler.js

You only need to ADD this code, NOT replace the entire file!

### STEP 1: Add the "Both" button handler

**FIND:** Line 73 (before the container button handler)
```javascript
    if (id.startsWith('welcome_setup_container_')) {
```

**ADD THIS ENTIRE BLOCK BEFORE IT (between line 72 and 73):**

```javascript
    if (id.startsWith('welcome_setup_both_')) {
      const originalUserId = id.split('_').pop();
      if (interaction.user.id !== originalUserId) {
        const errorContainer = new ContainerBuilder().setAccentColor(0x2B2D31)
          .addTextDisplayComponents(
            new TextDisplayBuilder().setContent('Only the command user can use this menu!')
          );
        return interaction.reply({
          components: [errorContainer],
          flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
      }

      const container = new ContainerBuilder().setAccentColor(0x2B2D31)
        .addTextDisplayComponents(
          new TextDisplayBuilder().setContent('### Welcome Setup - Both')
        )
        .addSeparatorComponents(
          new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true)
        )
        .addTextDisplayComponents(
          new TextDisplayBuilder().setContent('Select the channel where welcome messages will be sent:')
        )
        .addActionRowComponents(
          new ActionRowBuilder().addComponents(
            new ChannelSelectMenuBuilder()
              .setCustomId(`welcome_channel_both_${originalUserId}`)
              .setPlaceholder('Select welcome channel')
              .setChannelTypes(ChannelType.GuildText)
          )
        );

      return interaction.update({
        components: [container],
        flags: MessageFlags.IsComponentsV2
      });
    }

```

---

### STEP 2: Add the "Both" channel select handler

**FIND:** Line 591 (the end of channel select menu handlers, after container handler closes)
```javascript
      return interaction.update({ components: [container, selectRow, buttonRow], flags: MessageFlags.IsComponentsV2 });
    }
  }

  return false;
```

**ADD THIS ENTIRE BLOCK BEFORE `} return false;` (after line 591):**

```javascript
    if (id.startsWith('welcome_channel_both_')) {
      const originalUserId = id.split('_').pop();
      if (interaction.user.id !== originalUserId) {
        const errorContainer = new ContainerBuilder().setAccentColor(0x2B2D31)
          .addTextDisplayComponents(new TextDisplayBuilder().setContent('Only the command user can use this menu!'));
        return interaction.reply({ components: [errorContainer], flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral });
      }

      const selectedChannel = interaction.channels.first();
      if (!selectedChannel) {
        const container = new ContainerBuilder().setAccentColor(0x2B2D31)
          .addTextDisplayComponents(new TextDisplayBuilder().setContent('Please select a valid channel.'));
        return interaction.update({ components: [container], flags: MessageFlags.IsComponentsV2 });
      }

      await WelcomeConfig.upsert({ guildId: interaction.guild.id, channelId: selectedChannel.id, type: 'both' });

      const container = new ContainerBuilder().setAccentColor(0x2B2D31)
        .addTextDisplayComponents(new TextDisplayBuilder().setContent('### Welcome Setup - Both'))
        .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
        .addTextDisplayComponents(new TextDisplayBuilder().setContent('Customize your welcome message. You will set BOTH container and simple message.'));

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(`welcome_field_select_${originalUserId}`)
        .setPlaceholder('Select a field to customize')
        .addOptions(
          new StringSelectMenuOptionBuilder().setLabel('Title').setDescription('Set the container title').setValue('title'),
          new StringSelectMenuOptionBuilder().setLabel('Description').setDescription('Set the container description').setValue('description'),
          new StringSelectMenuOptionBuilder().setLabel('Color').setDescription('Set the accent color (hex code)').setValue('color'),
          new StringSelectMenuOptionBuilder().setLabel('Thumbnail').setDescription('Set the thumbnail image URL').setValue('thumbnail'),
          new StringSelectMenuOptionBuilder().setLabel('Image').setDescription('Set the main image URL').setValue('image'),
          new StringSelectMenuOptionBuilder().setLabel('Simple Message').setDescription('Set the simple text message').setValue('simple_message')
        );

      const selectRow = new ActionRowBuilder().addComponents(selectMenu);
      const buttonRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`welcome_submit_${originalUserId}`).setLabel('Submit').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('welcome_variables').setLabel('Variables').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId(`welcome_cancel_${originalUserId}`).setLabel('Cancel').setStyle(ButtonStyle.Danger)
      );

      return interaction.update({ components: [container, selectRow, buttonRow], flags: MessageFlags.IsComponentsV2 });
    }
```

---

### STEP 3: Update the field_select handler to include 'simple_message'

**FIND:** Around line 350 (in the `welcome_field_select_` handler)
```javascript
      if (selectedValue === 'image') {
        modal = new ModalBuilder()
          .setCustomId(`welcome_field_image_${originalUserId}`)
          .setTitle('Set Image');
        const input = new TextInputBuilder()
          .setCustomId('welcome_image')
          .setLabel('Image URL')
          .setPlaceholder('https://example.com/banner.png or use {server_icon}')
          .setStyle(TextInputStyle.Short)
          .setRequired(true);
        modal.addComponents(new ActionRowBuilder().addComponents(input));
      }

      if (modal) {
        return interaction.showModal(modal);
      }
      return true;
    }
```

**ADD BEFORE the `if (modal)` check:**

```javascript
      if (selectedValue === 'simple_message') {
        modal = new ModalBuilder()
          .setCustomId(`welcome_field_simple_${originalUserId}`)
          .setTitle('Set Simple Message');
        const input = new TextInputBuilder()
          .setCustomId('welcome_simple_text')
          .setLabel('Simple Message')
          .setPlaceholder('Welcome {user} to {server}!')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(2000)
          .setRequired(true);
        modal.addComponents(new ActionRowBuilder().addComponents(input));
      }
```

---

### STEP 4: Add modal submit handler for simple_message

**FIND:** Around line 290 (in the modal submit handlers)
```javascript
    if (id.startsWith('welcome_field_image_')) {
```

**ADD THIS BEFORE IT:**

```javascript
    if (id.startsWith('welcome_field_simple_')) {
      const originalUserId = id.split('_').pop();
      const simpleText = interaction.fields.getTextInputValue('welcome_simple_text');

      await interaction.deferUpdate();
      await WelcomeConfig.update({ message: simpleText }, { where: { guildId: interaction.guild.id } });

      const config = await WelcomeConfig.findOne({ where: { guildId: interaction.guild.id } });

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(`welcome_field_select_${originalUserId}`)
        .setPlaceholder('Select a field to customize')
        .addOptions(
          new StringSelectMenuOptionBuilder().setLabel('Title').setDescription('Set the container title').setValue('title'),
          new StringSelectMenuOptionBuilder().setLabel('Description').setDescription('Set the container description').setValue('description'),
          new StringSelectMenuOptionBuilder().setLabel('Color').setDescription('Set the accent color (hex code)').setValue('color'),
          new StringSelectMenuOptionBuilder().setLabel('Thumbnail').setDescription('Set the thumbnail image URL').setValue('thumbnail'),
          new StringSelectMenuOptionBuilder().setLabel('Image').setDescription('Set the main image URL').setValue('image'),
          new StringSelectMenuOptionBuilder().setLabel('Simple Message').setDescription('Set the simple text message').setValue('simple_message')
        );

      const selectRow = new ActionRowBuilder().addComponents(selectMenu);
      const buttonRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`welcome_submit_${originalUserId}`).setLabel('Submit').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('welcome_variables').setLabel('Variables').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId(`welcome_cancel_${originalUserId}`).setLabel('Cancel').setStyle(ButtonStyle.Danger)
      );

      return interaction.editReply({ components: [selectRow, buttonRow], flags: MessageFlags.IsComponentsV2 });
    }

```

---

## SUMMARY:

Just ADD 4 blocks to the existing file:
1. ✅ Both button handler (45 lines) - Insert after line 72
2. ✅ Both channel select handler (48 lines) - Insert after line 591
3. ✅ Simple message field option (8 lines) - Insert in field_select handler
4. ✅ Simple message modal handler (30 lines) - Insert in modal submit handler

Then restart bot! 🎉
