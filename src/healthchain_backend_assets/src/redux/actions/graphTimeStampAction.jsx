export const loadGraphTimeStampList = (authCannister) => async (dispatch) => {

  if (authCannister) {

    const graphTimeStampList = await authCannister.readProfileDataTimeStamps();

    let new_list = [];

    for (let timeStamp in graphTimeStampList) {
      new_list.push(new Date(Number(graphTimeStampList[timeStamp]) / 1000000))
    }

    let dateToday = new Date(); // Apr 17
    let dateSixWeeksAgo = new Date();

    dateSixWeeksAgo.setDate(dateToday.getDate() - 42);  // Mar 09


    let new_time_week_list = {};


    for (let time in new_list) {

      let dateSixWeeksAgo = new Date();

      dateSixWeeksAgo.setDate(dateToday.getDate() - 42);

      let dateComparator = dateSixWeeksAgo;

      if (new_list[time] > dateComparator) {  // greater than week 1

        dateComparator.setDate(dateComparator.getDate() + 7);

        if (new_list[time] > dateComparator) {  // greater than week 2

          dateComparator.setDate(dateComparator.getDate() + 7);

          if (new_list[time] > dateComparator) {  // greater than week 3

            dateComparator.setDate(dateComparator.getDate() + 7);

            if (new_list[time] > dateComparator) {  // greater than week 4

              dateComparator.setDate(dateComparator.getDate() + 7);

              if (new_list[time] > dateComparator) {  // greater than week 5

                dateComparator.setDate(dateComparator.getDate() + 7);

                if (new_list[time] > dateComparator) {  // greater than week 6

                  if (new_list[time] < dateToday) {  // less than today
                    if (new_time_week_list["week6"]) {
                      new_time_week_list["week6"] += 1;
                    } else {
                      new_time_week_list["week6"] = 1
                    }
                  }
                } else {
                  if (new_time_week_list["week5"]) {
                    new_time_week_list["week5"] += 1;
                  } else {
                    new_time_week_list["week5"] = 1
                  }
                }
              } else {
                if (new_time_week_list["week4"]) {
                  new_time_week_list["week4"] += 1;
                } else {
                  new_time_week_list["week4"] = 1
                }
              }
            } else {
              if (new_time_week_list["week3"]) {
                new_time_week_list["week3"] += 1;
              } else {
                new_time_week_list["week3"] = 1
              }
            }

          } else {

            if (new_time_week_list["week2"]) {
              new_time_week_list["week2"] += 1;
            } else {
              new_time_week_list["week2"] = 1
            }

          }

        } else {
          if (new_time_week_list["week1"]) {
            new_time_week_list["week1"] += 1;
          } else {
            new_time_week_list["week1"] = 1
          }
        }
      }
    }


    var output = Object.entries(new_time_week_list).map(([week, count]) => ({ week, count }));

    console.log(output);





    dispatch({
      type: 'get_graph_time_stamp',
      payload: { graphTimeStamps: output },
    })
  }
} 