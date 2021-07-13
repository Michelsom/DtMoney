
import './App.css';
import { Header } from './components/Header';

import { GlobalStyle } from './styles/global';

import { Dashboard } from './components/Dashboard/index';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './TransactionsContext';

export function App() {
  const [isNewTransctionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransctionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />

    </TransactionsProvider>
  );
}

