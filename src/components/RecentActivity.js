import React from "react";
import { Card, Feed } from "semantic-ui-react";
import moment from "moment";

const RecentAcitivity = ({ feeds }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>Recent Activity</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          {feeds.map(feed =>
            <Feed.Event key={feed.date}>
              <Feed.Content>
                <Feed.Date content={moment(feed.date).fromNow()} />
                <Feed.Summary>
                  {feed.message}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          )}
        </Feed>
      </Card.Content>
    </Card>
  );
};

export default RecentAcitivity;
