import React, { useState, useEffect } from 'react';
import { Container, Title } from '../Main/styles';
import { LoginForm, LoginInput, LoginButton } from './styles';
import { ButtonText } from '../../components/Repository/styles';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation, Link } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/auth/authenticate', {
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
            <Title>Entrar</Title>

            <LoginForm>
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
                />

                <LoginButton onPress={handleLogin}>
                    <ButtonText>ENTRAR</ButtonText>
                </LoginButton>
            </LoginForm>


        </Container>
    );
}
