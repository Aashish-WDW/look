// pages/search.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'
import ListingCard from '../components/ListingCard'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import Navvv from '../components/Navvv'

export default function SearchResults() {
    const router = useRouter()
    const { query: searchQuery } = router.query
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const performSearch = async () => {
            if (!searchQuery) return
            
            try {
                setLoading(true)
                
                // Perform a search across multiple fields
                const { data, error } = await supabase
                    .from('virtual_tours')
                    .select('*')
                    .or(
                        `title.ilike.%${searchQuery}%,` +
                        `landmark.ilike.%${searchQuery}%,` +
                        `type.ilike.%${searchQuery}%`
                    )
                
                if (error) throw error
                
                setSearchResults(data || [])
            } catch (err) {
                setError(err.message)
                console.error('Search error:', err)
            } finally {
                setLoading(false)
            }
        }
        
        performSearch()
    }, [searchQuery])
    
    // Only show loading when we have a query but results aren't ready yet
    if (loading && searchQuery) {
        return (
            <>
                <Navvv />
                <Container className="mt-4">
                    <div>Loading search results...</div>
                </Container>
            </>
        )
    }
    
    return (
        <>
            <Navvv />
            <Container className="mt-4">
                <h1>Search Results</h1>
                
                {error && (
                    <Alert variant="danger">
                        An error occurred: {error}
                    </Alert>
                )}
                
                {searchQuery ? (
                    searchResults.length === 0 ? (
                        <Alert variant="info">
                            No results found for "{searchQuery}"
                        </Alert>
                    ) : (
                        <Row>
                            {searchResults.map(listing => (
                                <Col key={listing.id} md={4} className="mb-4">
                                    <ListingCard listing={listing} />
                                </Col>
                            ))}
                        </Row>
                    )
                ) : (
                    <Alert variant="info">
                        Enter a search term to find virtual tours
                    </Alert>
                )}
            </Container>
        </>
    )
}