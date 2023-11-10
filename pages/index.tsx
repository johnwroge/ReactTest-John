import Layout from "@components/Layout/Layout";
import { useState, useEffect } from "react";
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';

const BASE_URL = `https://dummyapi.io/data/v1/`
const APP_ID = process.env.NEXT_PUBLIC_APP_ID; 


const IndexPage = (): JSX.Element => {

	const [posts, setPosts] = useState<Post[]>([]);
	const [searchResults, setSearchResults] = useState<Post[]>([]);

	const owners = Array.from(new Set(posts.map(post => post.owner)));
    const firstNames = Array.from(new Set(posts.map(post => post.owner.firstName)));
    const lastNames = Array.from(new Set(posts.map(post => post.owner.lastName)));

	const headers = new Headers({
		'Content-Type': 'application/json',
		'app-id': APP_ID,
	  });

	  interface Post {
		id: string;
		image: string;
		likes: number;
		tags: string[];
		text: string;
		publishDate: string;
		owner: {
		  id: string;
		  title: string;
		  firstName: string;
		  lastName: string;
		  picture: string;
		};
	  }

	useEffect(() => {
		fetch(`${BASE_URL}post`, {
			method: 'GET',
          	headers: headers,
		})
		.then(res => res.json())
		.then(data => {
			setPosts(data.data)
			setSearchResults(data.data)
		})
	},[])


	const display = searchResults.map((el, i) => (

		<div key = {`post-${i}`} className = {utilStyles.card}> 
		<Link href={el.image}>
      		<a>
        		<p> {el.image && <img src={el.image} alt="Post" />}</p>
      		</a>
    	</Link>
			<p> Post: {el.text}</p>
			<div className="owner"> 
			<p> {el.owner && el.owner.picture && <img src={el.owner.picture} alt="Owner" />}</p>
      		<p> Owner {el.owner && `${el.owner.firstName} ${el.owner.lastName}`}</p>
			</div> 
		</div>
	))

	const handleSubmit = (e) => e.preventDefault();

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(posts)


		const filteredPostsByProperty = posts.filter(post => {
			const regex = new RegExp(e.target.value, 'i');
			return (
				regex.test(post.text) || 
				regex.test(post.owner.firstName) ||
				regex.test(post.owner.lastName)
			)
		  });
        setSearchResults(filteredPostsByProperty)
    }

	const handleFilterChange = (e, property) => {
        if (e.target.value === '') {
            setSearchResults(posts);
        } else {
            const filteredPostsByProperty = posts.filter(post => {
                const regex = new RegExp(e.target.value, 'i');
                return regex.test(post.owner[property]);
            });
            setSearchResults(filteredPostsByProperty);
        }
    };

return (
	<Layout>
		<div className="filter__inputs"> 
		 <div >
                <div>
                    <label>First Name:</label>
                    <select onChange={(e) => handleFilterChange(e, 'firstName')}>
                        <option value="">All</option>
                        {firstNames.map(firstName => (
                            <option key={firstName} value={firstName}>
                                {firstName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Last Name:</label>
                    <select onChange={(e) => handleFilterChange(e, 'lastName')}>
                        <option value="">All</option>
                        {lastNames.map(lastName => (
                            <option key={lastName} value={lastName}>
                                {lastName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
		<div className="search__input" > 
		 <input
			type="text"
			id="search"
			onChange={handleSearchChange}
			placeholder = "Search Posts..."
			/>
		</div>
		</div>
		{display}
	</Layout>
	);
};

export default IndexPage;