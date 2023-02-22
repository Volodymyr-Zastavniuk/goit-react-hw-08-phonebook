export const getContacts = state => state.contacts.items;
export const getIsLoading = state => state.contacts.isLoading;
export const getContactsError = state => state.contacts.error;
export const getFilterValue = state => state.filter;

export const getUserName = state => state.auth.user.name;
export const getUserEmail = state => state.auth.user.email;
export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getIsRefreshing = state => state.auth.isRefreshing;
export const getToken = state => state.auth.token;
export const getAuthError = state => state.auth.error;
