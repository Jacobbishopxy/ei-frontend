// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    dev: process.env.NODE_ENV !== 'production',
    canAdmin: currentUser && currentUser.access === 'admin'
  };
}
