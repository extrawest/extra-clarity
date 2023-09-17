type IdFactoryFn = () => string;

const uniqueIdClosureFactory = (): IdFactoryFn => {
  let instances = 0;
  return () => 'ec-id-' + instances++;
};

export const uniqueIdFactory: IdFactoryFn = uniqueIdClosureFactory();
