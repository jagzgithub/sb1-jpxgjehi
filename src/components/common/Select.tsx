import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  FlatList 
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { colors, typography } from '../../theme';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
}

export function Select({ 
  label, 
  value, 
  options, 
  onChange, 
  error 
}: SelectProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.select, error && styles.selectError]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>
          {selectedOption?.label || 'Select an option'}
        </Text>
        <ChevronDown size={20} color={colors.text.secondary} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  select: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectError: {
    borderColor: colors.error,
  },
  selectText: {
    fontSize: typography.sizes.md,
    color: colors.text.primary,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: typography.sizes.md,
    color: colors.text.primary,
  },
});