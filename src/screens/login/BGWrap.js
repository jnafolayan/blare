import styled from 'styled-components';

const BGWrap = styled.div`
  position: relative;

  .login-bg {
    background-image: url(img/auth-bg.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  .dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: hsla(200, 8%, 5%, 0.6);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .auth-card {
    width: 100%;
    max-width: 567px;

    button {
      transition: all 0.3s;
    }
  }
`;

export default BGWrap;
