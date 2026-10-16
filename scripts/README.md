# Lumora catalog import

`npm run seed:catalog` uses `addCollectionAndDocuments` from the existing Firebase utility to import `SHOP_DATA` into the configured project's `categories` collection. Configure the existing `REACT_APP_FIREBASE_*` variables in `.env.local` or `.env` first.

This is an explicit setup command, never a page-load operation. It creates eight category documents containing twelve products and atomically records `catalogMigrations/lumora-catalog-v1`. Subsequent runs skip writing and verify the stored products. Existing destination categories cause the initial import to stop without overwriting anything. Other existing categories are preserved.

The command uses the Firebase client SDK and respects Firestore security rules. It needs read access to categories and the marker, and write access for the initial import. It does not weaken rules or embed administrator credentials.

The app fetches categories through the existing Redux saga and `getCategoriesAndDocuments`. Homepage, shop, search, and favorites derive their catalog from that response; no seed data is bundled as their data source.
