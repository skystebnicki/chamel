/**
 * Handle triggering custom events and bubbling them up
 *
 */

/**
 * Handle triggering custom events
 */
var CustomEventTrigger = {

    /**
     * Trigger a custom event
     *
     * @param {string} type The name of the event type
     * @param {Object} opt_data Optional data to send to the event
     * @param {bool} bubble If true (default) then bubble up to parent
     */
    triggerCustomEvent: function(type, opt_data, bubble) {
        var evtData = opt_data || {};
        if (this.props.eventsObj) {
            alib.events.triggerEvent(this.props.eventsObj, type, evtData);
        } else {
            throw 'An eventsObj has not been passed by the parent of this componenet.';
        }
    }

};

module.exports = CustomEventTrigger;
