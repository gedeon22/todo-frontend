import axios from 'axios';

export default class APIService {
    static GetItems(token) {
        return axios.get('http://localhost:8000/items/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}`
        } 
        })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch(err => console.log(err))
    }

    static UpdateItem(item_id, body, token) {
        return fetch(`http://127.0.0.1:8000/items/${item_id}/`, {
            'method':'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}` 
              },
              'body':JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static InsertItem(body, token) {
        return fetch('http://127.0.0.1:8000/items/', {
            'method':'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}` 
              },
              'body':JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static DeleteItem(item_id, token) {
        return fetch(`http://127.0.0.1:8000/items/${item_id}/`, {
        'method':'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}` 
          }
    })
}

static LoginUser(body) {
    return fetch('http://127.0.0.1:8000/auth/', {
        'method':'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          'body':JSON.stringify(body)
    }).then(resp => resp.json())
}

static RegisterUser(body) {
    return fetch('http://127.0.0.1:8000/users/', {
        'method':'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          'body':JSON.stringify(body)
    }).then(resp => resp.json())
}

}