# smm-web-panel

The web application does not require any special package installations. It utilizes the following technologies:
- HTML
- CSS
- JavaScript (and graphic libraries)
- JSON as a database

The application is structured with the addition of a simple login page (quite basic and lacking additional firewalls/security).

Once logged in with the following credentials (contained in `credentials.json`):
- Username: trade
- Password: premierstudios2024

You will be automatically redirected to the dashboard, and a cookie will be set to save the session and indicate that you are already logged in.

The data (very raw) is kept inside the `data.json` file, as this is an experimental and basic application. In a real situation, the data would have been received through an API and stored in an SQL database (e.g., MySQL/MariaDB), and queries would have been used to display the data and filter it in a more optimized manner.

There is a collapsible sidebar with pages (not linked, as it was requested to work only on the main dashboard. I decided to implement the pages without creating them to give a preview of how the application would look if it were fully developed in every detail). The same goes for the search bar, which is currently not linked since the data is present in the JSON file and not in a relational database, where better results could be achieved.

The demo is viewable at [social.trade-exe.tech](http://social.trade-exe.tech).
