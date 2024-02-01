document.getElementById('qrForm').addEventListener('submit', async function (event) {
  event.preventDefault();
document.getElementById('downloadButton').style.display = 'block';
  const data = document.getElementById('input').value;
  const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
  });
  downloadButton.disabled = false;
  const result = await response.json();
  document.getElementById('result').innerHTML = `<img src="${result.qrCodeImage}" alt="QR Code">`;

  document.getElementById('downloadButton').addEventListener('click', function () {
    const a = document.createElement('a');
    a.href = result.qrCodeImage;
    a.download = "qrcode.png";
    a.click();
});

});
