import { EcCommonStrings } from './common-strings.interface';

export const commonStringsDefault: EcCommonStrings = {
  autoRefresh: {
    autoRefreshDisabled: 'Auto refresh disabled',
    autoRefreshMessage: 'Auto refresh in {SEC} sec',
    refreshing: 'Refreshing...',
  },
  buttonCopyToClipboard: {
    title: 'Copy to Clipboard',
  },
  card: {
    errorOccured: 'An error occurred',
    hideError: 'Hide error details',
    loading: 'Loading... Please wait',
    noDataFound: 'No data found',
    reload: 'Reload',
    reloadDataMessage: 'Please, try to reload the data a bit later',
    showError: 'Show error details',
    unknownError: 'Unknown Error',
  },
  datagridFilters: {
    apply: 'Apply',
    clear: 'Clear',
    discard: 'Discard',
    emailNotValid: 'The entered value is not a valid e-mail',
    enteredValueInvalid: 'The entered value is invalid',
    filterOptions: 'Filter the options...',
    from: 'from',
    full: 'full',
    inputIssuesMessage: 'There are some issues with the component"s inputs:',
    loading: 'Loading...',
    maxLengthError: '[maxLength] must be positive (current value: {MAX_LENGTH})',
    maxLengthMessage: 'Max length exceeded ({ACTUAL_LENGTH}/{REQUIRED_LENGTH})',
    minLengthError: '[minLength] must be positive (current value: {MIN_LENGTH})',
    minLengthMessage: 'Please provide at least {MIN_LENGTH} characters',
    noOptionsAvailable: 'No options available',
    noOptionsFound: 'No options found for the entered search-term',
    partial: 'partial',
    past24Hours: 'Past 24 Hours',
    past28Days: 'Past 28 Days',
    past7Days: 'Past 7 Days',
    pastHour: 'Past Hour',
    patternError: `[pattern] is required when [validator]="'pattern'"`,
    pleaseWait: 'Please wait',
    propertyKeyRequired: '[propertyKey] is required',
    rangeLengthError: '[maxLength] must be less than or equal to [minLength] ({MAX_LENGTH} < {MIN_LENGTH})',
    resetToDefault: 'Reset to Default',
    searchMessage: 'Searching for a {TYPE} match in "{PROPERTY_NAME}"',
    selected: 'Selected: {VALUE}',
    selectedItems: 'Selected {SELECTED} out of {TOTAL}',
    selectedNone: 'Selected none',
    showAll: 'Show All',
    showAllTime: 'Show "All Time"',
    to: 'To',
    today: 'Today',
    uuidNotValid: 'The entered value is not a valid uuid',
    validationError: `[pattern] is provided, but [validator] is not set to 'pattern'`,
    wrongInput: 'Wrong input',
    yesterday: 'Yesterday'
  },
  dialog: {
    cancel: 'Cancel',
    ok: 'Ok'
  },
  shared: {
    allTime: 'All Time',
    customPeriod: 'Custom Period',
    typeToSearch: 'Type to search...'
  },
  timeRangeToggle: {
    afterDateTime: 'After {DATETIME}',
    beforeDateTime: 'Before {DATETIME}',
    unnamedPeriod: 'Unnamed Period'
  }
};
