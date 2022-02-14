export const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.style.display = 'none';
};
