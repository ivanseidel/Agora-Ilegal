import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import CenterBox from '../components/CenterBox';
import Form from '../components/Form';
import H1 from '../components/H1';
import Page from '../components/Page';
import SubjectText from '../components/SubjectText';
import { colors, radius } from '../styles/variables';

export const defaultBackgroundColor = colors.blue;

const FormBigText = styled.p`
  width: 100%;
  line-height: 50px;
  font-size: 24px;
  text-align: center;
  vertical-align: middle;
`;

const StyledForm = styled(Form)`
  min-height: 70px;
  padding: 10px;
  background-color: #ed2127;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
`;

class LoadingPage extends Component {
  static defaultProps = { backgroundColor: defaultBackgroundColor };

  static propTypes = {
    backgroundColor: React.PropTypes.string,
    changeBackgroundColor: React.PropTypes.func.isRequired,
    processing: React.PropTypes.bool.isRequired,
    push: React.PropTypes.func.isRequired,
    setMessage: React.PropTypes.func.isRequired,
    subject: React.PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    const { backgroundColor, changeBackgroundColor, push, setMessage, subject } = this.props;

    changeBackgroundColor(backgroundColor);

    clearTimeout(this.timeout);
    // only wait for the gif for a few seconds, then redirect
    this.timeout = setTimeout(() => {
      setMessage('Nós estamos tendo muitos acessos! Se não funcionou para você, por favor salve esse site nos favoritos e volte mais tarde.');
      push(`/#${subject}`);
    }, 15000);
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  }

  render() {
    const { processing, subject } = this.props;

    if (!processing) {
      return (
        <Page background="transparent">
          <CenterBox>
            <H1>
              Verifique se <SubjectText>{subject}</SubjectText> está ilegalizado...
            </H1>
          </CenterBox>
        </Page>
      );
    }

    return (
      <Page background="transparent">
        <CenterBox>
          <H1>Tornando <SubjectText>{subject}</SubjectText> ilegal...</H1>
          <StyledForm radius={radius}>
            <FormBigText>Carregando...</FormBigText>
          </StyledForm>
        </CenterBox>
      </Page>
    );
  }
}

export default withRouter(LoadingPage);
