export function removeAllWarnings() {
  const warnings = document.querySelectorAll('.warning');
  warnings.forEach(warning => {
    warning.remove();
  });
}