import React from 'react';
import {Switch, Redirect } from 'react-router-dom';  ///////////////////////////////////
import { RouteWithLayout } from './components';


import { PrivateRoute } from './components';
import {isAuthenticated} from "../src/services/auth"


import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {
  Dashboard as DashboardView,
  SignIn as SignInView,
  TarefaList as TarefaListView,
  Clientes as ClientesView,
  ProdutoList as ProdutoListView,
  FornecedorList as FornecedorListView,
  // Typography as TypographyView,
  // Icons as IconsView,
  AddFornecedores as AddFornecedoresView,
  // Settings as SettingsView,
  SignUp as SignUpView,
  // NotFound as NotFoundView
} from './views';







////// A ROTA PRIVADA NÃO FUNCIONA QUANDO É COLOCADO O <Layout>

// const PrivateRoute = props => {
//   const { layout: Layout, component: Component, ...rest } = props;

//   return (
//   <Route
  
//     {...rest}
//     render={ matchProps =>
//       isAuthenticated() ? (
//         <Layout>          
//           <Component {...matchProps} />
//         </Layout>
          
//         ) : (
//         <Redirect to={{ path: "/", state: { from: props.location } }} />
        
//       )}
    
//   />
//   );
// };

/////////////////////////////////////////////////////////////////////////////////////////////





const Routes = () => {
  return (
  // <BrowserRouter>
    <Switch>
      <Redirect
        exact
        from="/"
        to="/login"
      />

      {/* <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      /> */}

      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        
      />

      <PrivateRoute
        component={TarefaListView}
        exact
        layout={MainLayout}
        path="/tarefas"
      />

      <PrivateRoute
        component={ClientesView}
        exact
        layout={MainLayout}
        path="/clientes"
      />

      <PrivateRoute
        component={ProdutoListView}
        exact
        layout={MainLayout}
        path="/produtos"
      />

      <PrivateRoute
        component={FornecedorListView}
        exact
        layout={MainLayout}
        path="/fornecedores"
      />

      <RouteWithLayout   // rota que não precisa passa por autenticação para ser acessada
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout    // rota que não precisa passa por autenticação para ser acessada
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />

      <PrivateRoute
        component={AddFornecedoresView}
        exact
        layout={MainLayout}
        path="/AddFornecedor"
      />



      <Redirect to="/not-found" />
     </Switch>
  // </BrowserRouter>
  );
};

export default Routes;
