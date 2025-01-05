import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; 
import './App.css';
import './i18n';
import CharacterList from './components/CharacterList';
import LanguageSwitcher from './components/LanguageSwitcher';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CharacterList />
        <LanguageSwitcher />
      </div>
    </ApolloProvider>
  );
};

export default App;
