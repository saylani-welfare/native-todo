/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View
} from 'react-native';
import axios from 'axios';

export default class nouroz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      todos: []
    };
  }

  componentWillMount() {
    console.log("willmount");
    axios.get('https://native-todo.herokuapp.com/api/todos')
      .then((response) => {
        this.setState({ todos: response.data })
        console.log(this.state.todos)
      })
  }

  _addTodo = () => {
    //this.setState({ showText: this.state.todo })
    //todo.push(this.state.todo)
    axios.post('https://native-todo.herokuapp.com/api/todos', { todo: this.state.todo })
      .then(axios.get('https://native-todo.herokuapp.com/api/todos')
        .then((response) => {
          this.setState({ todos: response.data })
          console.log(this.state.todos)
        }))
  }

  _delTodo(id) {
    axios.delete('https://native-todo.herokuapp.com/api/todos/' + id)
      .then((res) => { console.log("deleted") })
      .then(axios.get('https://native-todo.herokuapp.com/api/todos')
        .then((response) => {
          this.setState({ todos: response.data })
          console.log(this.state.todos)
        }))
      .catch(() => { console.log("failed to delete") })
  }
  render() {
    console.log(this.state.todos)
    return (
      <View style={styles.container}>
        <Text>
          react-native Todo App
        </Text>
        <View style={{ flexDirection: 'row'}}>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 , marginRight: 10}}
            onChangeText={(todo) => this.setState({ todo })}
            value={this.state.todo}
          />
          <Button style={styles.applingMargin}
            onPress={this._addTodo}
            title="Add"
          ></Button>
        </View>
        {this.state.todos.map((item, i) => {
          return (<View style={{ flexDirection: 'row'}} key={i} >
            <Text style={{marginRight: 10}}>{item.todo}</Text>
            <Button style={styles.applingMargin}
              onPress={() => this._delTodo(item._id)}
              title="Delete"
            ></Button>
          </View>)
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  applingMargin: {
    marginLeft: 10,
    flexDirection: 'row'
  },
});

AppRegistry.registerComponent('nouroz', () => nouroz);
