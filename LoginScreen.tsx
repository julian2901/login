import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [loginUsername, setLoginUsername] = useState('usuario1');
  const [loginPassword, setLoginPassword] = useState('123');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState<{ id: number; username: string; password: string; }[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleLogin = () => {
    if (loginUsername === 'usuario1' && loginPassword === '123') {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCreateUser = () => {
    if (username && password) {
      const newUser: { id: number; username: string; password: string; } = { id: users.length + 1, username, password };
      setUsers([...users, newUser]);
      setUsername('');
      setPassword('');
      Alert.alert('Info', 'New user created successfully');
    } else {
      Alert.alert('Error', 'Username and password are required');
    }
  };

  const handleEditUser = (id: number) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setUsername(userToEdit.username);
      setPassword(userToEdit.password);
      setEditMode(true);
      setSelectedUserId(id);
    }
  };

  const handleSaveEdit = () => {
    if (username && password && selectedUserId !== null) {
      const updatedUsers = users.map(user =>
        user.id === selectedUserId ? { ...user, username, password } : user
      );
      setUsers(updatedUsers);
      setUsername('');
      setPassword('');
      setEditMode(false);
      setSelectedUserId(null);
      Alert.alert('Info', 'User updated successfully');
    } else {
      Alert.alert('Error', 'Username and password are required');
    }
  };

  const handleDeleteUser = (id: number) => {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
    Alert.alert('Info', 'User deleted successfully');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text>                 Bienvenido a sus Registros, { loginUsername } !             </Text>
          <Button title=" Salir " onPress={handleLogout}/>
          <View style={styles.createUserForm}>
            <Text style={styles.formTitle}>Crear Nuevo Usuario </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {editMode ? (
              <Button title="  Guardar  " onPress={handleSaveEdit} />
            ) : (
              <Button title="   Crear usuario  " onPress={handleCreateUser} />
            )}
          </View>
          <View style={styles.userList}>
            <Text style={styles.userListTitle}>Usuarios :</Text>
            {users.map(user => (
              <View key={user.id} style={styles.userListItem}>
                <Text>{user.username}</Text>
                <Button title="  Editar  " onPress={() => handleEditUser(user.id)} />
                <Button title= "  Eliminar" onPress={() => handleDeleteUser(user.id)} />
              </View>
            ))}
          </View>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={loginUsername}
            onChangeText={setLoginUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98D4F9',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  createUserForm: {
    marginTop: 65,
    color: 'red',
    
  },
  formTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  userList: {
    marginTop: 20,
  },
  userListTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

