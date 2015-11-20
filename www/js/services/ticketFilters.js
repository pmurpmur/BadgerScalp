angular.module('filters', [])

.filter('thisUser', function() {
  return function(tickets, user) {
    var out = [];
    angular.forEach(tickets, function(ticket) {
      if (ticket.seller === user) {
        out.push(ticket);
      } 
    });
    return out;
  }
})

.filter('userBids', function() {
  return function(tickets, bids) {
    var out = [];
    angular.forEach(bids, function(bic) {
      angular.forEach(tickets, function(ticket) {
        if (bid == ticket.$id) {
          out.push(ticket);
        }
      });
    });
    return out;
  }
})

.filter('ticketFilter', function() {
  return function(tickets, query, category, date, minPrice, maxPrice) {
    var today = new Date();
    var yesterday = new Date(today.setDate(today.getDate() - 1));
    
    var out = [];
    // angular.forEach(tickets, function(ticket) {
    //   if ((new Date(ticket.date)) > yesterday) {
    //     out.push(ticket);
    //   }
    // });
    // tickets = out;

    // out = [];
    if (category != 'all') {
      angular.forEach(tickets, function(ticket) {
        if (ticket.type.toLowerCase() == category) {
          out.push(ticket);
        }
      });
      tickets = out;
    }

    out = [];
    if (query !== undefined) {
      angular.forEach(tickets, function(ticket) {
        if ((ticket.title).toLowerCase().indexOf(query.toLowerCase()) > -1) {
          out.push(ticket);
        }
      });
      tickets = out;
    }
    
    out = [];
    if (date !== undefined) {
      angular.forEach(tickets, function(ticket) {
        if (ticket.date == date) {
          out.push(ticket);
        }
      });
      tickets = out;
    }
    
    out = [];
    if (minPrice !== undefined && minPrice != 0 && maxPrice !== undefined) {
      angular.forEach(tickets, function(ticket) {
        if (ticket.price >= minPrice && ticket.price <= maxPrice) {
          out.push(ticket);
        }
      });
      tickets = out;
    }
    else if (minPrice !== undefined && minPrice != 0 && maxPrice === undefined) {
      angular.forEach(tickets, function(ticket) {
        if (ticket.price >= minPrice) {
          out.push(ticket);
        }
      });
      tickets = out;
    }
    else if ((minPrice === undefined || minPrice == 0) && maxPrice !== undefined) {
      angular.forEach(tickets, function(ticket) {
        if (ticket.price >= minPrice) {
          out.push(ticket);
        }
      });
      tickets = out;
    }

    return tickets;
  }
})
