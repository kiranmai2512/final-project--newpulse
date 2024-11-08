document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const registerForm = document.querySelector('#registerForm');
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');
    const phone = document.querySelector('#phone');
    const messageDiv = document.getElementById('message');

    const loginForm = document.querySelector('#loginForm');
    const loginEmail = document.querySelector('#loginemail');
    const loginPassword = document.querySelector('#loginpassword');
    const successMessage = document.querySelector('#successMessage');

    if (registerForm) {
        console.log('Register form found');
        registerForm.addEventListener('submit', (event) => {
            let valid = true;
            let errorMessages = [];
            messageDiv.innerHTML = '';
            messageDiv.classList.remove('success', 'error');
            messageDiv.style.display = 'none';
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            if (!validateName(name.value)) {
                errorMessages.push('Name must contain only letters');
                valid = false;
            }

            if (!validateEmail(email.value)) {
                errorMessages.push('Invalid email address');
                valid = false;
            }

            if (!validatePassword(password.value)) {
                errorMessages.push('Password must be at least 8 characters long and include a mix of letters, numbers, and special characters');
                valid = false;
            }

            if (password.value !== confirmPassword.value) {
                errorMessages.push('Passwords do not match');
                valid = false;
            }

            if (!validatePhone(phone.value)) {
                errorMessages.push('Phone number must contain only numbers');
                valid = false;
            }

            if (!valid) {
                messageDiv.innerHTML = errorMessages.join('<br>');
                messageDiv.classList.add('error'); 
                messageDiv.style.display = 'block';
                event.preventDefault();
            } else {
                messageDiv.innerHTML = 'Registration completed!';
                messageDiv.classList.add('success');
                messageDiv.style.display = 'block'; 

                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 3000);
            }
        });
    }

    function validateName(name) {
        const re = /^[A-Za-z\s'-]+$/;
        return re.test(name);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    function validatePhone(phone) {
        const re = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,9}$/;
        return re.test(phone);
    }

    function adjustFontSize() {
        document.body.style.fontSize = window.innerWidth < 600 ? '14px' : '16px';
    }

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize)
const newsApiKey = 'b6fee15f333447f594742daef5f7e90d';
const textRazorApiKey = '82e5e6e1dead1f65ce471698d07d85ffdcfa599bec3352258a7a705e';

const newsContainer = document.getElementById('news-container');
const sentimentContainer = document.getElementById('sentiment-container');
const loadNewsButton = document.getElementById('load-news');


async function fetchNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    renderNews(data.articles);
  } catch (error) {
    console.error('Fetch news error:', error);
    newsContainer.innerHTML = '<p>Error loading news articles. Please try again later.</p>';
  }
}


async function performSentimentAnalysis(text) {
  const url = 'https://api.textrazor.com/';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-textrazor-key': textRazorApiKey,
      },
      body: new URLSearchParams({ text }),
    });
    const data = await response.json();
    renderSentiment(data);
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    sentimentContainer.innerHTML = '<p>Error performing sentiment analysis.</p>';
  }
}

function renderNews(articles) {
  newsContainer.innerHTML = '';
  if (articles.length === 0) {
    newsContainer.innerHTML = '<p>No news articles available.</p>';
    return;
  }
  articles.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    newsItem.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="${article.title}">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(newsItem);
  });
}

function renderSentiment(data) {
  if (data.response && data.response.sentiment) {
    sentimentContainer.innerHTML = `<p>Sentiment Score: ${data.response.sentiment.score}</p>`;
  } else {
    sentimentContainer.innerHTML = '<p>No sentiment analysis result available.</p>';
  }
}

loadNewsButton.addEventListener('click', () => {
  console.log('Load New News button clicked'); // Debugging line
  fetchNews();
  performSentimentAnalysis('Breaking news content for analysis...');
});

fetchNews();
});

