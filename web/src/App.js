import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Link from './components/Link';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import PageContainer from './components/PageContainer';
import SharePage from './pages/SharePage';
import { colors, padding } from './styles/variables';
import { tryDecodeURI, removeIllegalCharacters } from './utils/helpers';

// fix github page router path handler
const basename = window.location.hostname.indexOf('github') >= 0 &&
  window.location.pathname.split('/')[1]
  ? `/${window.location.pathname.split('/')[1]}`
  : undefined;

const DonationHeader = styled.header`
  padding: ${2 * padding}px ${padding}px;
  text-align: center;

  p {
    color: #fff;
  }
`;

const MessageHeader = styled.header`
  padding: ${2 * padding}px ${padding}px;
  text-align: center;

  p {
    color: lightyellow;
  }
`;

export default class extends Component {
  state = { backgroundColor: colors.blue, message: '' };

  setMessage = message => {
    this.setState({ message });
  };

  changeBackgroundColor = backgroundColor => {
    this.setState({ backgroundColor });
  };

  render() {
    const { backgroundColor, message } = this.state;

    if (window.location.search.indexOf('ref=producthunt') >= 0) {
      localStorage.fromProductHunt = true;
    }

    return (
      <Router basename={basename}>
        <PageContainer background={backgroundColor}>
          <DonationHeader>
            <p>
              <Link
                href="https://www.patreon.com/isnowillegal"
                target="_blank"
              >
                <span>⚠️ Clique aqui para manter esse site no ar. 💰🔥</span>
              </Link>
            </p>
          </DonationHeader>
          <MessageHeader>
            {message && <p>{message}</p>}
          </MessageHeader>
          <Switch>
            <Route
              path="/"
              render={props => {
                const urlParam = window.location.search[0] === '?'
                  ? tryDecodeURI(window.location.search.replace('?', ''))
                  : '';

                const possibleSubject = tryDecodeURI(
                  removeIllegalCharacters(urlParam),
                );

                if (possibleSubject && possibleSubject === urlParam) {
                  return <SharePage subject={possibleSubject} {...props} />;
                }

                return <MainPage {...props} />;
              }}
              changeBackgroundColor={this.changeBackgroundColor}
              setMessage={this.setMessage}
              exact
            />
            <Route
              path="/:subject"
              render={({ match: { params: { subject } }, ...props }) => (
                <SharePage subject={tryDecodeURI(subject)} {...props} />
              )}
              changeBackgroundColor={this.changeBackgroundColor}
              setMessage={this.setMessage}
            />
          </Switch>
          <Footer>
            <p>
              <Link
                className="github-button"
                href="https://github.com/ivanseidel/Agora-Ilegal"
                data-style="mega"
                data-count-href="/ivanseidel/Agora-Ilegal/stargazers"
                data-count-api="/repos/ivanseidel/Agora-Ilegal#stargazers_count"
                data-count-aria-label="# stargazers on GitHub"
                aria-label="Star ivanseidel/Agora-Ilegal on GitHub"
              >
                Star on GitHub
              </Link>
            </p>
            <p>Um protesto nerd feito por </p>
            <p>
              <Link href="https://github.com/ivanseidel" target="_blank">
                Ivan Seidel
              </Link>
              {', '}
              <Link href="https://twitter.com/brunolemos" target="_blank">
                Bruno Lemos
              </Link>
              {', '}
              <Link href="https://github.com/joaopedrovbs" target="_blank">
                João Pedro
              </Link>
              {' & '}
              <Link href="https://github.com/feosilva" target="_blank">
                Felipe Silva
              </Link>
            </p>
          </Footer>
        </PageContainer>
      </Router>
    );
  }
}
