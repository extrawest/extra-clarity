export interface EcCommonStrings {
  autoRefresh: AutoRefresh;
  buttonCopyToClipboard: ButtonCopyToClipboard;
  card: Card;
  datagridFilters: DatagridFilters;
  dialog: Dialog;
  shared: Shared;
  timeRangeFilter: TimeRangeFilter;
  timeRangeToggle: TimeRangeToggle;
}

interface AutoRefresh {
  disabled: string;
  message: string;
  refreshing: string;
}

interface ButtonCopyToClipboard {
  title: string;
}

interface Card {
  errorOccurred: string;
  hideError: string;
  loading: string;
  noDataFound: string;
  reload: string;
  reloadDataMessage: string;
  showError: string;
  unknownError: string;
}

interface DatagridFilters {
  clear: string;
  emailNotValid: string;
  enteredValueInvalid: string;
  filterOptions: string;
  full: string;
  inputIssuesMessage: string;
  loading: string;
  maxLengthError: string;
  maxLengthMessage: string;
  minLengthError: string;
  minLengthMessage: string;
  noOptionsAvailable: string;
  noOptionsFound: string;
  partial: string;
  patternError: string;
  pleaseWait: string;
  propertyKeyRequired: string;
  rangeLengthError: string;
  resetToDefault: string;
  searchMessage: string;
  selected: string;
  selectedItems: string;
  selectedNone: string;
  showAll: string;
  showAllTime: string;
  uuidNotValid: string;
  validationError: string;
}

interface Dialog {
  cancel: string;
  ok: string;
}

interface Shared {
  customPeriod: string;
  typeToSearch: string;
}

interface TimeRangeFilter {
  apply: string;
  discard: string;
  from: string;
  to: string;
  wrongInput: string;
}

interface TimeRangeToggle {
  afterDateTime: string;
  allTime: string;
  beforeDateTime: string;
  unnamedPeriod: string;
}
