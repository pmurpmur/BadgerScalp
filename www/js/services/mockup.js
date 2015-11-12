{
	users: {
		$userId: {
			firstName: String,
			lastName: String,
			rating: Number,
			listings: [$listingId, $listingId, ...],
			bids: [$bidId, $bidId, ...]
		}
		$userId: {...},
		$userId: {...},
		$userId: {...},
		$userId: {...},
		...
	},

	listings: {
		$listingId: {

		}
		$listingId: {...},
		$listingId: {...},
		$listingId: {...},
		$listingId: {...},
		...
	},

	bids: {
		$bidsId: {
			bidder: $userId,
			listing: $listingId,
			price: Number,
			date: Number
		}
		$bidsId: {...},
		$bidsId: {...},
		$bidsId: {...},
		$bidsId: {...},
		...
	},

	events: {
		$eventId: {
			title: String,
			sport: String,
			opponent: String,
			date: Number,
			listings: [$listingId, $listingId, ...],
		},
		$eventId: {...},
		$eventId: {...},
		$eventId: {...},
		$eventId: {...},
		...
	}
}