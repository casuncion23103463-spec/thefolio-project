export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
};