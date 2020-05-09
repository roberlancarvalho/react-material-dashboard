import React, { useState, useEffect, Component} from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import api from '../../services/api'
import {login} from '../../services/auth'
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

const schema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));




class SignIn extends Component {
  state = {
    email: "",
    username:"",
    password: "",
    error: ""
  };
  
  // const useStyles = useStyles();
  // const { history } = props;


  // const [formState, setFormState] = useState({
  //   isValid: false,
  //   values: {},
  //   touched: {},
  //   errors: {}
  // });

  // useEffect(() => {
  //   const errors = validate(formState.values, schema);

  //   setFormState(formState => ({
  //     ...formState,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formState.values]);

  // handleBack = () => {
  //   history.goBack();
  // };

  handleChange = event => {
    event.persist();

    // setFormState(formState => ({
    //   ...formState,
    //   values: {
    //     ...formState.values,
    //     [event.target.name]:
    //       event.target.type === 'checkbox'
    //         ? event.target.checked
    //         : event.target.value
    //   },
    //   touched: {
    //     ...formState.touched,
    //     [event.target.name]: true
    //   }
    // }));
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha os dados para continuar!" });
    } else {
      try {
        const response = await api.post("", { username, email, password });
        login(response.data.token);
        this.props.history.push("/dashboard");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  

    render(){

  return (
    <div className={makeStyles.root}>
      <Grid
        className={makeStyles.grid}
        container
      >
        <Grid
          className={makeStyles.quoteContainer}
          item
          lg={5}
        >
          <div className={makeStyles.quote}>
            <div className={makeStyles.quoteInner}>
              <Typography
                className={makeStyles.quoteText}
                variant="h1"
              >
                Cadastre suas tarefas no sistema e tenha melhor controle e gerenciamento delas. Basta logar com seu email e cadastrá-las na página.
              </Typography>
              <div className={makeStyles.person}>
                <Typography
                  className={makeStyles.name}
                  variant="body1"
                >
                  Set Tarefas
                </Typography>
                <Typography
                  className={makeStyles.bio}
                  variant="body2"
                >
                  Garenciador de Tarefas Online
                </Typography>
              </div>
            </div>
          </div>
        </Grid>

        
        <Grid
          className={makeStyles.content}
          item
          lg={7}
          xs={12}
        >
          <div className={makeStyles.content}>
            <div className={makeStyles.contentHeader}>
              {/* <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton> */}
            </div>

            
            <div className={makeStyles.contentBody}>
              <form
                className={makeStyles.form}
                onSubmit={this.handleSignIn}
              >
                <Typography
                  className={makeStyles.title}
                  variant="h2"
                >
                  Login
                </Typography>


                {/* <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Entre com seu endereço de email
                </Typography> */}


                {/* <Grid
                  className={classes.socialButtons}
                  container
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <GoogleIcon className={classes.socialIcon} />
                      Login with Google
                    </Button>
                  </Grid>
                </Grid> */}



                <Typography
                  align="center"
                  className={useStyles.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  Entre com seu endereço de email
                </Typography>

                {this.state.error && <p>{this.state.error}</p>}

                <TextField
                  className={useStyles.textField}
                  // error={hasError('username')}
                  fullWidth
                  // helperText={
                  //   hasError('username') ? formState.errors.username[0] : null
                  // }
                  label="Nome de usuário"
                  name="username"
                  onChange={e => this.setState({ username: e.target.value })}
                  type="text"
                  // value={formState.values.username || ''}
                  variant="outlined"
                />


                <TextField
                  className={useStyles.textField}
                  // error={hasError('email')}
                  fullWidth
                  // helperText={
                  //   hasError('email') ? formState.errors.email[0] : null
                  // }
                  label="Endereço de email"
                  name="email"
                  onChange={e => this.setState({ email: e.target.value })}
                  type="email"
                  // value={formState.values.email || ''}
                  variant="outlined"
                />


                <TextField
                  className={useStyles.textField}
                  // error={hasError('password')}
                  fullWidth
                  // helperText={
                  //   hasError('password') ? formState.errors.password[0] : null
                  // }
                  label="Senha"
                  name="password"
                  onChange={e => this.setState({ password: e.target.value })}
                  type="password"
                  // value={formState.values.password || ''}
                  variant="outlined"
                />



                <Button
                  className={useStyles.signInButton}
                  color="primary"
                  // disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Entrar
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Não tem uma conta?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Criar conta
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
