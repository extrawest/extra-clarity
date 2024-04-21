import { EcCommonStrings } from './common-strings.interface';

export const commonStringsDefault: EcCommonStrings = {
  autoRefresh: {
    disabled: 'Auto refresh disabled',
    message: 'Auto refresh in {SEC} sec',
    refreshing: 'Refreshing...',
  },
  buttonCopyToClipboard: {
    title: 'Copy to clipboard',
  },
  card: {
    errorOccurred: 'An error occurred',
    hideError: 'Hide error details',
    loading: 'Loading... Please wait',
    noDataFound: 'No data found',
    reload: 'Reload',
    reloadDataMessage: 'Please, try to reload the data a bit later',
    showError: 'Show error details',
    unknownError: 'Unknown error',
  },
  datagridFilters: {
    clear: 'Clear',
    emailNotValid: 'The entered value is not a valid e-mail',
    enteredValueInvalid: 'The entered value is invalid',
    filterOptions: 'Filter the options...',
    inputIssuesMessage: 'There are some issues with the component"s inputs:',
    loading: 'Loading...',
    maxLengthError:
      '[maxLength] must be positive (current value: {MAX_LENGTH})',
    maxLengthMessage: 'Max length exceeded ({ACTUAL_LENGTH}/{REQUIRED_LENGTH})',
    minLengthError:
      '[minLength] must be positive (current value: {MIN_LENGTH})',
    minLengthMessage: 'Please provide at least {MIN_LENGTH} characters',
    noOptionsAvailable: 'No options available',
    noOptionsFound: 'No options found for the entered search-term',
    patternError: `[pattern] is required when [validator]="'pattern'"`,
    pleaseWait: 'Please wait',
    propertyKeyRequired: '[propertyKey] is required',
    rangeLengthError:
      '[maxLength] must be less than or equal to [minLength] ({MAX_LENGTH} < {MIN_LENGTH})',
    resetToDefault: 'Reset to default',
    selected: 'Selected: {VALUE}',
    selectedItems: 'Selected {SELECTED} out of {TOTAL}',
    selectedNone: 'Selected none',
    showAll: 'Show all',
    showAllTime: 'Show "All time"',
    uuidNotValid: 'The entered value is not a valid uuid',
    validationError: `[pattern] is provided, but [validator] is not set to 'pattern'`,
  },
  dialog: {
    cancel: 'Cancel',
    ok: 'Ok',
  },
  shared: {
    typeToSearch: 'Type to search...',
  },
  timeRangeFilter: {
    apply: 'Apply',
    customPeriod: 'Custom period',
    discard: 'Discard',
    from: 'From',
    to: 'To',
    wrongInput: 'Wrong input',
  },
  timeRangeToggle: {
    afterDateTime: 'After {DATETIME}',
    allTime: 'All time',
    beforeDateTime: 'Before {DATETIME}',
    unnamedPeriod: 'Unnamed period',
  },
};
