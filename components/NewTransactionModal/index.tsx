import Modal from 'react-modal';
import { FormEvent, useContext, useState } from 'react';
import { TransactionsContext } from '../../TransactionsContext';

import closedImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, Header, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal(
    { isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useContext(TransactionsContext)

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type,
        });
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose()
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal"
        >

            <Container onSubmit={handleCreateNewTransaction}>
                <Header>
                    <h2>Cadastrar Transação</h2>
                    <button type="button" onClick={onRequestClose}>
                        <img src={closedImg} alt="Sair" />
                    </button>
                </Header>

                <input
                    placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === 'deposit'}
                        onClick={() => { setType('deposit'); }}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entradas" />
                        <span>Entradas</span>

                    </RadioBox>

                    <RadioBox
                        type="button"
                        isActive={type === 'withdraw'}
                        onClick={() => { setType('withdraw'); }}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saidas" />
                        <span>Saídas</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>

            </Container>
        </Modal>
    );
}