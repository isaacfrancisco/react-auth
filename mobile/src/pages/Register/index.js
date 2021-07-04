import React, { useState } from 'react';
import { Container, Title } from '../Main/styles';
import { LoginForm, LoginInput, ActionButton } from '../Login/styles';
import { ButtonText } from '../../components/Projects/styles';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
            })
            console.log(response.data);

            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("name", response.data.user.name);
            await AsyncStorage.setItem("id", response.data.user._id);

            const value = await AsyncStorage.getItem("token");

            console.log(value);
            navigation.navigate('Main');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Title>Cadastrar</Title>

            <LoginForm>
                <LoginInput
                    value={name}
                    onChangeText={name => setName(name)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Nome"
                />
                <LoginInput
                    value={email}
                    onChangeText={email => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Email"
                />
                <LoginInput
                    value={password}
                    onChangeText={password => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Senha"
                    secureTextEntry={true}
                />

                <ActionButton onPress={handleLogin}>
                    <ButtonText>CADASTRAR</ButtonText>
                </ActionButton>
            </LoginForm>


        </Container>
    );
}
