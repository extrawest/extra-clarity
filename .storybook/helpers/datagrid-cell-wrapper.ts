export const wrapWrapperWithinDatagrid = (wrapperTemplate: string): string => {
  return `
      <style>
        .contentful-col {
          width: 15rem;
        }
      </style>
      <div>
        <clr-alert>
          <clr-alert-item>
            <div class="alert-text">
              Drag the column borders to change their width to see
              how it affects the cells containing too long strings
            </div>
          </clr-alert-item>
        </clr-alert>
        <clr-datagrid>
          <clr-dg-column class="contentful-col"> With Wrapper </clr-dg-column>
          <clr-dg-column class="contentful-col"> Without Wrapper </clr-dg-column>
          <clr-dg-column> Dummy </clr-dg-column>
          <clr-dg-column> Dummy </clr-dg-column>
          <clr-dg-row>
            <clr-dg-cell class="contentful-col">
              ${wrapperTemplate}
            </clr-dg-cell>
            <clr-dg-cell class="contentful-col">
              {{ cellContent }}
            </clr-dg-cell>
            <clr-dg-cell> Dummy content </clr-dg-cell>
            <clr-dg-cell> Dummy content </clr-dg-cell>
          </clr-dg-row>
        </clr-datagrid>
      </div>
  `;
};
