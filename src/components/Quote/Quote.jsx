import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Quote.scss';

const Quote = ({ category }) => {
  const [quoteObj, setQuoteObj] = useState({});

  useEffect(() => {
    const url = category
      ? `https://quotes.rest/qod?category=${category}&language=en`
      : 'https://quotes.rest/qod?language=en';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const quoteData = data.contents.quotes[0];

        if (quoteData) {
          setQuoteObj({
            text: quoteData.quote,
            author: quoteData.author,
          });
        }
      })
      .catch(() => {
        // Handle error
      });
  }, []);

  return (
    <div className="Quote-container">
      <blockquote>
        {quoteObj.text}
      </blockquote>
      <cite>
        -
        {' '}
        {quoteObj.author}
      </cite>
    </div>
  );
};

Quote.propTypes = {
  category: PropTypes.string,
};

Quote.defaultProps = {
  category: 'inspire',
};

export default Quote;
