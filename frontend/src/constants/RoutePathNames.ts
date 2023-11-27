const RoutePathNames = {
  content: '/content',
  contentById: '/content/:id',
  contentByIdFn: (id: string) => `/content/${id}`,
  home: '/home',
};

export default RoutePathNames;
