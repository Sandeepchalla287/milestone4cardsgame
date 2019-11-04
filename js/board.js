
var Game = function() {
   this.free = [null, null, null, null];
   this.suits = [null, null, null, null];
   this.columns = [[], [], [], [], [], [], [], []];
   this.deck = new this.Deck();
};

Game.prototype.init = function() {
   var card;

   this.deck.shuffle();

   for (var i = 0; i < 52; i++) {
       card = this.deck.cards[i];
       this.columns[i % 8].push(card);
   }
};

Game.prototype.valid_drag_ids = function() {
   var drag_ids, i, card, col, col_len;

   drag_ids = [];

   for (i = 0; i < 4; i++) {
       card = this.free[i];
       if (card !== null) {
           drag_ids.push(card.id.toString());
       }
   }
   for (i = 0; i < 8; i++) {
       col = this.columns[i];
       col_len = col.length;
       if (col_len > 0) {
           card = col[col_len - 1];
           drag_ids.push(card.id.toString());
       }
   }

   return drag_ids;
};

Game.prototype.valid_drop_ids = function(card_id) {
   var drop_ids, i, free, suit_card, drag_card, bottom_cards, card, col;

   drop_ids = [];

   drag_card = this.deck.get_card(card_id);

   for (i = 0; i < 4; i++) {
       free = this.free[i];
       if (free === null) {
           drop_ids.push('free' + i.toString());
       }
   }

   for (i = 0; i < 4; i++) {
       suit_card = this.suits[i];
       if (suit_card === null) {
           if (drag_card.value === 1) {
               drop_ids.push('suit' + i.toString());
           }
       } else {
           if ((drag_card.suit === suit_card.suit) &&
               (drag_card.value === suit_card.value + 1)) {
               drop_ids.push('suit' + i.toString());
           }
       }
   }

   bottom_cards = this.col_bottom_cards();
   for (i = 0; i < bottom_cards.length; i++) {
       card = bottom_cards[i];

       if ((card.value === drag_card.value + 1) &&
           (card.colour !== drag_card.colour)) {
           drop_ids.push(card.id.toString());
       }
   }

   for (i = 0; i < 8; i++) {
       col = this.columns[i];
       if (col.length === 0) {
           drop_ids.push('col' + i.toString());
       }
   }

   return drop_ids;
};

Game.prototype.col_bottom_cards = function() {
   var i, col, card_count, bottom_cards;

   bottom_cards = [];

   for (i = 0; i < 8; i++) {
       col = this.columns[i];
       card_count = col.length;
       if (card_count > 0) {
           bottom_cards.push(col[card_count - 1]);
       }
   }

   return bottom_cards;
};

Game.prototype.move_card = function(drag_id, drop_id) {
   var drag_card, col_index;

   drag_card = this.pop_card(drag_id);

   if (drop_id.length <= 2) {
       drop_id = parseInt(drop_id, 10);
       this.push_card(drag_card, drop_id);
   } else {
       col_index = parseInt(drop_id.charAt(drop_id.length - 1), 10);
       if (drop_id.slice(0, 1) === 'f') {
           this.free[col_index] = drag_card;
       } else if (drop_id.slice(0, 1) === 's') {
           this.suits[col_index] = drag_card;
       } else {
           this.columns[col_index].push(drag_card);
       }
   }
};

Game.prototype.pop_card = function(card_id) {
   var i, col, card;

   for (i = 0; i < 8; i++) {
       col = this.columns[i];
       if (col.length === 0) {
           continue;
       }
       card = col[col.length - 1];
       if (card.id === card_id) {
           return col.pop();
       }
   }

   for (i = 0; i < 4; i++) {
       card = this.free[i];
       if ((card !== null) && (card.id === card_id)) {
           this.free[i] = null;
           return card;
       }
   }
   alert('error in Game.pop_card()');
   return null;
};

Game.prototype.push_card = function(card, drop_id) {
   var i, col, col_len, bottom_card;

   for (i = 0; i < 8; i++) {
       col = this.columns[i];
       col_len = col.length;
       if (col_len === 0) {
           continue;
       }
       bottom_card = col[col.length - 1];
       if (bottom_card.id === drop_id) {
           col.push(card);
           return;
       }
   }
};

Game.prototype.is_game_won = function() {
   var i, card;

   for (i = 0; i < 4; i++) {
       card = this.suits[i];
       if (card === null || card.value !== 13) {
           return false;
       }
   }
   return true;
};

Game.prototype.Deck = function() {
   var suits, values, colours, i, suit, value;

   suits = ['clubs', 'spades', 'hearts', 'diamonds'];
   values = [1, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
   colours = {'clubs': 'black',
              'spades': 'black',
              'hearts': 'red',
              'diamonds': 'red'};

   this.cards = [];
   for (i = 0; i < 52; i++) {
       suit = suits[i % 4];
       value = values[Math.floor(i / 4)];
       this.cards.push(new this.Card(i + 1, suit, value, colours[suit]));
   }
};

Game.prototype.Deck.prototype.shuffle = function() {
   var len, i, j, item_j;


   len = this.cards.length;
   for (i = 0; i < len; i++) {
       j = Math.floor(len * Math.random());
       item_j = this.cards[j];
       this.cards[j] = this.cards[i];
       this.cards[i] = item_j;
   }
};

Game.prototype.Deck.prototype.get_card = function(card_id) {
   var i, card;

   for (i = 0; i < 52; i++) {
       card = this.cards[i];
       if (card_id === card.id) {
           return card;
       }
   }
   alert('error in Deck.get_card()');
   return null;
};

Game.prototype.Deck.prototype.Card = function(id, suit, value, colour) {
   this.id = id;
   this.suit = suit;
   this.value = value;
   this.colour = colour;
};

Game.prototype.Deck.prototype.Card.prototype.sameSuit = function(other) {
   return this.suit === other.suit;
};

Game.prototype.Deck.prototype.Card.prototype.sameColour = function(other) {
   return this.colour === other.colour;
};

Game.prototype.Deck.prototype.Card.prototype.sameValue = function(other) {
   return this.value === other.value;
};

Game.prototype.Deck.prototype.Card.prototype.image = function() {
   return 'images/' + this.id.toString() + '.png';
};

var UI = function(game) {
   this.game = game;
   // an array of all the draggables
   this.drag = [];
   // an array of all the droppables
   this.drop = [];
};

UI.prototype.init = function() {
   this.game.init();

   this.add_cards();

   this.create_draggables();
};

UI.prototype.add_cards = function() {
   var i, j, cards, num_cards, col_div, card, img, card_div;

   for (i = 0; i < 8; i++) {
       cards = this.game.columns[i];
       num_cards = cards.length;

       col_div = document.getElementById('col' + i.toString());

       for (j = 0; j < num_cards; j++) {
           card = cards[j];
           img = new Image();
           img.src = card.image();

           card_div = document.createElement('div');
           card_div.className = 'card';
           card_div.id = card.id;
           card_div.style.top = (25 * j).toString() + 'px';
           card_div.appendChild(img);

           col_div.appendChild(card_div);
       }
   }
};

UI.prototype.remove_cards = function() {
   var i;

   for (i = 0; i < 8; i++)
   {
       $('#col' + i.toString()).empty();
   }
};

UI.prototype.create_draggables = function() {
   var card_ids, card_count, i, id, card_div, this_ui;

   card_ids = this.game.valid_drag_ids();
   card_count = card_ids.length;
   this_ui = this;

   for (i = 0; i < card_count; i++) {
       id = card_ids[i];
       card_div = $('#' + id);

       this_ui.drag.push(card_div);

       card_div.draggable({
           stack: '.card',
           containment: '#table',
           revert: 'invalid',
           revertDuration: 200,
           start: this_ui.create_droppables(),
           stop: this_ui.clear_drag()
       });
       card_div.draggable('enable');

       card_div.bind('dblclick', {this_ui: this_ui}, this_ui.dblclick_draggable);

       card_div.hover(
           function(event) {
               $(this).addClass('highlight');
           },
           function(event) {
               $(this).removeClass('highlight');
           }
       );
   }
};

UI.prototype.dblclick_draggable = function(event) {
   var this_ui, drop_ids, card_id, drop_len, i, drop_id, drop_div;
   this_ui = event.data.this_ui;

   card_id = parseInt(this.id, 10);
   drop_ids = this_ui.game.valid_drop_ids(card_id);
   drop_len = drop_ids.length;

   for (i = 0; i < drop_len; i++) {
       drop_id = drop_ids[i];
       if (drop_id.substr(0, 4) === 'suit') {
           this_ui.dblclick_move(card_id, drop_id, this_ui);
           return;
       }
   }

   for (i = 0; i < drop_len; i++) {
       drop_id = drop_ids[i];
       if (drop_id.substr(0, 4) === 'free') {
           this_ui.dblclick_move(card_id, drop_id, this_ui);
           return;
       }
   }
};

UI.prototype.dblclick_move = function(card_id, drop_id, this_ui) {
   var offset_end, offset_current, drop_div, left_end, top_end, left_move,
       top_move, card, left_current, top_current, max_z;

   card = $('#' + card_id);
   drop_div = $('#' + drop_id);
   offset_end = drop_div.offset();
   offset_current = card.offset();

   left_end = offset_end['left'];
   top_end = offset_end['top'];
   left_current = offset_current['left'];
   top_current = offset_current['top'];

   left_move = left_end - left_current + 3;
   top_move = top_end - top_current + 3;

   max_z = this_ui.card_max_zindex();
   card.css('z-index', max_z + 1);

   card.animate({top: '+=' + top_move, left: '+=' + left_move},
                 250,
                 function() {
                       this_ui.game.move_card(card_id, drop_id);
                       this_ui.clear_drag()();
                       this_ui.is_won();

   });
};

UI.prototype.card_max_zindex = function() {
   var max_z = 0;
   $('.card').each(function(i, el) {
       z_index = parseInt($(el).css('z-index'), 10);
       if (!isNaN(z_index) && z_index > max_z) {
           max_z = z_index;
       }
   });
   return max_z;
};

UI.prototype.create_droppables = function() {
   var this_ui;
   this_ui = this;

   var droppers = function(event, ui) {
       var drop_ids, i, drop_id, drag_id, drop_div;

       drag_id = parseInt($(this).attr('id'), 10);
       drop_ids = this_ui.game.valid_drop_ids(drag_id);

       for (i = 0; i < drop_ids.length; i++) {
           drop_id = drop_ids[i];
           drop_div = $('#' + drop_id.toString());
           this_ui.drop.push(drop_div);
           drop_div.droppable({
               drop: function(event, ui) {
                   var card_offset, this_id;

                   this_id = $(this).attr('id');
                   if (this_id.length <= 2) {
                       card_offset = '0 25';
                   } else if (this_id.charAt(0) === 'c') {
                       card_offset = '1 1';
                   } else {
                       card_offset = '3 3';
                   }

                   ui.draggable.position({
                       of: $(this),
                       my: 'left top',
                       at: 'left top',
                       offset: card_offset
                   });

                   this_ui.game.move_card(drag_id, this_id);

                   this_ui.is_won();

                   this_ui.clear_drop();
               }
           });
           drop_div.droppable('enable');
       }
   };

   return droppers;
};

UI.prototype.clear_drag = function() {
   var this_ui;
   this_ui = this;

   return function(event, ui) {
       var i, item;

       for (i = 0; i < this_ui.drag.length; i++) {
           item = this_ui.drag[i];
           item.unbind('mouseenter').unbind('mouseleave');
           $(this).removeClass('highlight');
           item.unbind('dblclick');
           item.draggable('destroy');
       }
       this_ui.drag.length = 0;

       this_ui.clear_drop();

       this_ui.create_draggables();
   };
};

UI.prototype.clear_drop = function() {
   var i, item;

   for (i = 0; i < this.drop.length; i++) {
       item = this.drop[i];
       item.droppable('destroy');
   }
   this.drop.length = 0;
};

UI.prototype.is_won = function() {
   if (this.game.is_game_won()) {
       this.win_animation();
       $('#windialog').dialog('open');
   }
};

var my_ui;
$(document).ready(function() {
   var g;

   g = new Game();
   my_ui = new UI(g);
   my_ui.init();
});
