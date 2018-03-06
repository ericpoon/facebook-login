import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { facebookLogin, facebookLogout } from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
  }

  render() {
    const { userName, error } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {!!userName && <Text>Welcome back, {userName}</Text>}
        {!!error && <Text>Failed to login: {error}</Text>}
        {!!userName && <Button title={'Log out'} onPress={this.props.facebookLogout} />}
        {!userName && <Button title={'Log in'} onPress={this.props.facebookLogin} />}
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userName: auth.name,
  error: auth.error,
});

export default connect(mapStateToProps, { facebookLogin, facebookLogout })(AuthScreen);
