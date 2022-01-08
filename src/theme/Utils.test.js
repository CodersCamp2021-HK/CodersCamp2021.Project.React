import { transformToCssVariablesTheme } from './Utils';

describe('transformToCssVariablesTheme', () => {
  it('should generate css variables and theme which uses them', () => {
    // Given
    const nestedTheme = {
      key1: {
        key2: {
          key3: 'val1',
          key4: 'val2',
        },
        key5: 'val3',
        key6: 'val4',
      },
      key7: 'val5',
    };

    // When
    const { theme, variables } = transformToCssVariablesTheme(nestedTheme);

    // Then
    expect(theme).toEqual({
      key1: {
        key2: {
          key3: 'var(--key1-key2-key3)',
          key4: 'var(--key1-key2-key4)',
        },
        key5: 'var(--key1-key5)',
        key6: 'var(--key1-key6)',
      },
      key7: 'var(--key7)',
    });
    expect(variables).toEqual({
      '--key1-key2-key3': 'val1',
      '--key1-key2-key4': 'val2',
      '--key1-key5': 'val3',
      '--key1-key6': 'val4',
      '--key7': 'val5',
    });
  });
});
