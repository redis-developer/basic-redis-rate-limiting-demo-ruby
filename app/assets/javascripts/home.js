document.addEventListener('DOMContentLoaded', function () {
  const sendButton = document.querySelector('#test-button');
  const resetButton = document.querySelector('#reset-button');
  const limitSelect = document.querySelector('#limit-select');
  const timerDiv = document.querySelector('#timer');
  const resultDiv = document.querySelector('#result');
  const pingUrl = '/ping';

  const onSendButtonClick = e => {
    e.preventDefault();

    let counter = 15,
      requestInterval,
      counterInterval,
      tick = -1,
      requestsSent = 0,
      successfulRequests = 0,
      blockedRequests = 0;

    const requestsToSend = parseInt(limitSelect.value);
    const whenToSendTick = Math.floor(100 / requestsToSend);

    sendButton.disabled = true;
    limitSelect.disabled = true;

    const callPing = async () => {
      try {
        requestsSent++;

        let remainingRequests = 10 - requestsSent;

        await axios.get(pingUrl, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'RateLimit-Remaining': remainingRequests < 0 ? 0 : remainingRequests,
            Pragma: 'no-cache',
            Expires: '0'
          }
        });
        successfulRequests++;
      } catch (err) {
        blockedRequests++;
      }
    };

    timerDiv.innerHTML = `Wait ${counter} seconds to test again`;
    timerDiv.classList.remove('d-none');

    let result = document.createElement('p');
    result.classList.add('lead');

    const sentMessage = document.createElement('span');
    const successfulMessage = document.createElement('span');
    successfulMessage.style.color = 'green';

    const blockedMessage = document.createElement('span');
    blockedMessage.style.color = 'red';

    result.appendChild(sentMessage);
    result.appendChild(successfulMessage);
    result.appendChild(blockedMessage);

    resultDiv.prepend(result);

    requestInterval = setInterval(() => {
      tick++;

      if (tick % whenToSendTick === 0 && requestsSent < requestsToSend) {
        callPing();
      }

      sentMessage.innerHTML = `Sent ${requestsSent} requests. `;

      if (successfulRequests) {
        successfulMessage.innerHTML = `Handled ${successfulRequests} requests. `;
      }

      if (blockedRequests) {
        blockedMessage.innerHTML = `Blocked ${blockedRequests} requests. `;
      }

      let tickCounter = 150;

      if (tick === tickCounter) {
        resetButton.classList.remove('d-none');
        sendButton.disabled = false;
        limitSelect.disabled = false;
        timerDiv.innerHTML = '';
        timerDiv.classList.add('d-none');
        clearInterval(counterInterval);
        clearInterval(requestInterval);
      }

      if (successfulRequests + blockedRequests === requestsToSend && tick > tickCounter || tick > 200) {
        clearInterval(requestInterval);
      }
    }, 100);

    counterInterval = setInterval(() => {
      counter--;

      if (counter) {
        timerDiv.innerHTML = `Wait ${counter} seconds to test again`;
      }
    }, 1000);
  };

  const onResetButtonClick = e => {
    e.preventDefault();

    resultDiv.innerHTML = '';
    resetButton.classList.add('d-none');
  };

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      limitSelect.value = 5;
    },
    false
  );

  sendButton.addEventListener('click', onSendButtonClick);
  resetButton.addEventListener('click', onResetButtonClick);
});