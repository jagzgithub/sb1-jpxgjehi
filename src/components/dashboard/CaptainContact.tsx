import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { useCaptainContact } from '../../hooks/useCaptainContact';
import { colors, typography, spacing } from '../../theme';

export function CaptainContact() {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading, error, success } = useCaptainContact();

  const handleSubmit = async () => {
    await sendMessage(message);
    if (!error) setMessage('');
  };

  return (
    <Card>
      <View style={styles.header}>
        <MessageSquare size={20} color={colors.primary} />
        <Text style={styles.title}>Contact Captain</Text>
      </View>

      {error && <Alert type="error" message={error} />}
      {success && (
        <Alert type="success" message="Message sent successfully!" />
      )}

      <Input
        label="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        placeholder="Type your message here..."
        style={styles.input}
      />

      <Button
        title={isLoading ? 'Sending...' : 'Send Message'}
        onPress={handleSubmit}
        loading={isLoading}
        disabled={!message.trim()}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  input: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
});