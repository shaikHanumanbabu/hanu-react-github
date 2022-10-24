import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';



const GithubContext = React.createContext()

const GithubProvider = ({children}) => {
    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [follwers, setFollwers] = useState(mockFollowers)
    const [requests, setRequests] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({show: false, msg: ''})
    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`).then(({data}) => {
            let {rate: {remaining}} = data
            // remaining = 0
            setRequests(remaining)
            if(remaining == 0) {
                toggleShow(true, 'You requests exceeded')
            } else {
                setLoading(false)
            }
        }).catch((err) => console.log(err))
    }
    const searchGithubUser = async (user) => {
        console.log(user);
        //toggle error
        // set loading true
        setLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).catch((error) => console.log(error))
        console.log(response);
        if(response) {
            setGithubUser(response.data)
            const {login , followers_url } = response.data
            // await axios(`${rootUrl}/users/${login}/repos?per_page=100`)
            // .then(({data}) => {
            //     // console.log(data);
            //     setRepos(data)
            // }).catch((err) => console.log(err))

            // await axios(`${rootUrl}/users/${login}/followers?per_page=100`)
            // .then(({data}) => {
            //     setFollwers(data)
            //     // console.log(data);

            // }).catch((err) => console.log(err))

            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`), 
                axios(`${rootUrl}/users/${login}/followers?per_page=100`)]).then((results) => {
                console.log(results);
                const [repos, followers ] = results
                const status = 'fullfilled'
                if(repos.status == status) {
                    setRepos(repos.value.data)
                }
                if(followers.status == status) {
                    setFollwers(followers.value.data)
                }
            })
            .catch((err) => console.log(err))
            // https://api.github.com/users/john-smilga/repos?per_page=100
            // https://api.github.com/users/john-smilga/followers
        } else {
            toggleShow(true, 'Bad user')
        }
        checkRequest()
        setLoading(false)

    }
    function toggleShow(show = false, msg = '') {
        setError({show, msg})
    }
    useEffect(() => {
        checkRequest()
        console.log('app loaded');
    }, [])
    return <GithubContext.Provider value={{githubUser, repos, follwers, requests, error, searchGithubUser, loading, setLoading}}>{children}</GithubContext.Provider>
}

export {GithubContext, GithubProvider}
