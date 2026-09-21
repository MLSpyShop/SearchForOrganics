# Security Specification - Search For Organics

## Data Invariants
1. A search history record must belong to a valid user and match their `request.auth.uid`.
2. User profiles can only be read or written by the owner.
3. Search history is private to the user who created it.
4. Timestamps (`createdAt`, `updatedAt`, `timestamp`) must be validated against `request.time`.

## The "Dirty Dozen" Payloads (Denial Expected)
1. Creating a user profile with a different UID.
2. Reading another user's search history.
3. Updating a search history record (they should be immutable once created).
4. Injecting a 1MB string into the search query field.
5. Setting `email_verified` to true without actual verification.
6. Deleting another user's profile.
7. Creating a search record without a `userId`.
8. Spoofing `timestamp` with a client-side date.
9. Listing all search history records across all users.
10. Adding shadow fields to a user profile.
11. Bypassing size limits on search queries.
12. Creating a user profile as an unauthenticated user.

## Test Strategy
All tests will be verified using the standard Firestore Security Rules emulator environment.
