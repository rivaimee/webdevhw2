
  async function loadListings() {
    const response = await fetch("./data/boston_listings_50.json");
    const listings = await response.json();

    const listingsGroup = document.querySelector(".listingsGroup");

    listings.forEach((listing) => {
      const listingElement = document.createElement("div");
      listingElement.classList.add("listing");

      const image = document.createElement("img");
      image.src = listing.picture_url;
      image.alt = listing.name;
      image.classList.add("listingImage");

      const title = document.createElement("h3");
      title.textContent = listing.name;

      const price = document.createElement("p");
if (listing.price) {
  price.textContent = `Price: ${listing.price}`;
} else {
  price.textContent = "Price: Not available";
}

const rating = document.createElement("p");
rating.classList.add("rating");

if (listing.rating) {
  const roundedRating = Math.round(Number(listing.rating));
  const reviews = listing.number_of_reviews || "0";

  const stars =
    "★".repeat(roundedRating) +
    "☆".repeat(5 - roundedRating);

  rating.textContent =
    `${stars} ${listing.rating} (${reviews} reviews)`;
} else {
  rating.textContent = "Rating: Not available";
}


      const description = document.createElement("p");
      description.classList.add("description");

      if (listing.description) {
        const shortDescription =
          listing.description.split(/<br\s*\/?>/i)[0];
        description.innerHTML = shortDescription;
      } else {
        description.textContent = "Description not available.";
      }

      const amenitiesTitle = document.createElement("h4");
      amenitiesTitle.textContent = "Amenities";

      const amenitiesList = document.createElement("ul");
      amenitiesList.classList.add("amenitiesList");

      const visibleAmenities = listing.amenities.slice(0, 5);

      visibleAmenities.forEach((amenity) => {
        const amenityItem = document.createElement("li");
        amenityItem.textContent = amenity;
        amenitiesList.appendChild(amenityItem);
      });

      if (listing.amenities.length > 5) {
        const moreAmenities = document.createElement("li");
        moreAmenities.textContent =
          `+${listing.amenities.length - 5} more`;
        amenitiesList.appendChild(moreAmenities);
      }

      const hostImage = document.createElement("img");
      hostImage.src = listing.host_picture_url;
      hostImage.alt = `Photo of ${listing.host_name}`;
      hostImage.classList.add("hostImage");

      const host = document.createElement("p");
      host.textContent = `Hosted by: ${listing.host_name}`;

      const hostInfo = document.createElement("div");
      hostInfo.classList.add("hostInfo");

      hostInfo.appendChild(hostImage);
      hostInfo.appendChild(host);

      const links = document.createElement("div");
      links.classList.add("listingLinks");

      const listingLink = document.createElement("a");
      listingLink.href = listing.listing_url;
      listingLink.textContent = "View Listing";
      listingLink.target = "_blank";
      listingLink.rel = "noopener noreferrer";

      const hostLink = document.createElement("a");
      hostLink.href = listing.host_url;
      hostLink.textContent = "View Host";
      hostLink.target = "_blank";
      hostLink.rel = "noopener noreferrer";

      links.appendChild(listingLink);
      links.appendChild(hostLink);

      listingElement.appendChild(image);
      listingElement.appendChild(title);
      listingElement.appendChild(price);
      listingElement.appendChild(rating);
      listingElement.appendChild(description);
      listingElement.appendChild(amenitiesTitle);
      listingElement.appendChild(amenitiesList);
      listingElement.appendChild(hostInfo);
      listingElement.appendChild(links);

      listingsGroup.appendChild(listingElement);
    });
  }

  loadListings();
