export interface EcCommonStrings {
  autoRefresh: AutoRefresh;
  buttonCopyToClipboard: ButtonCopyToClipboard;
  card: Card;
  datagridFilters: DatagridFilters;
  dialog: Dialog;
  shared: Shared;
  timeRangeToggle: TimeRangeToggle;
}

interface AutoRefresh {
  autoRefreshDisabled: string;
  autoRefreshMessage: string;
  refreshing: string;
}

interface ButtonCopyToClipboard {
  title: string;
}

interface Card {
  errorOccured: string;
  hideError: string;
  loading: string;
  noDataFound: string;
  reload: string;
  reloadDataMessage: string;
  showError: string;
  unknownError: string;
}

interface DatagridFilters {
  apply: string;
  clear: string;
  discard: string;
  emailNotValid: string;
  enteredValueInvalid: string;
  filterOptions: string;
  from: string;
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
  past24Hours: string;
  past28Days: string;
  past7Days: string;
  pastHour: string;
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
  to: string;
  today: string;
  uuidNotValid: string;
  validationError: string;
  wrongInput: string;
  yesterday: string;
}

interface Dialog {
  cancel: string;
  ok: string;
}

interface Shared {
  allTime: string;
  customPeriod: string;
  typeToSearch: string;
}

interface TimeRangeToggle {
  afterDateTime: string;
  beforeDateTime: string;
  unnamedPeriod: string;
}
