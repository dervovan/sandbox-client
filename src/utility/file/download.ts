const downloadToFile = (
  content: string,
  filename?: string,
  contentType?: string
) => {
  const fn = filename ?? `sandbox${new Date().valueOf()}`;
  const ct = contentType ?? "text/plain";
  const a = document.createElement("a");
  const file = new Blob([content], { type: ct });

  const href = URL.createObjectURL(file);
  a.href = href;
  a.download = fn;
  document.body.appendChild(a);
  a.click();

  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(href);
  }, 0);
};

export default downloadToFile;