export const loadAIGraphTimeStampList = (authCannister) => async (dispatch) => {

  if (authCannister) {

    const graphHeartTimeStampList = await authCannister.readHeartReportDataTimeStamps();

    let new_list_heart = [];

    for (let timeStamp in graphHeartTimeStampList) {
      new_list_heart.push(new Date(Number(graphHeartTimeStampList[timeStamp]) / 1000000))
    }

    let dateToday = new Date(); // Apr 17

    let new_time_week_list_heart = {};


    for (let time in new_list_heart) {

      let dateSixWeeksAgo = new Date();

      dateSixWeeksAgo.setDate(dateToday.getDate() - 42);

      let dateComparator = dateSixWeeksAgo;

      if (new_list_heart[time] > dateComparator) {  // greater than week 1

        dateComparator.setDate(dateComparator.getDate() + 7);

        if (new_list_heart[time] > dateComparator) {  // greater than week 2

          dateComparator.setDate(dateComparator.getDate() + 7);

          if (new_list_heart[time] > dateComparator) {  // greater than week 3

            dateComparator.setDate(dateComparator.getDate() + 7);

            if (new_list_heart[time] > dateComparator) {  // greater than week 4

              dateComparator.setDate(dateComparator.getDate() + 7);

              if (new_list_heart[time] > dateComparator) {  // greater than week 5

                dateComparator.setDate(dateComparator.getDate() + 7);

                if (new_list_heart[time] > dateComparator) {  // greater than week 6

                  if (new_list_heart[time] < dateToday) {  // less than today
                    if (new_time_week_list_heart["week6"]) {
                      new_time_week_list_heart["week6"] += 1;
                    } else {
                      new_time_week_list_heart["week6"] = 1
                    }
                  }
                } else {
                  if (new_time_week_list_heart["week5"]) {
                    new_time_week_list_heart["week5"] += 1;
                  } else {
                    new_time_week_list_heart["week5"] = 1
                  }
                }
              } else {
                if (new_time_week_list_heart["week4"]) {
                  new_time_week_list_heart["week4"] += 1;
                } else {
                  new_time_week_list_heart["week4"] = 1
                }
              }
            } else {
              if (new_time_week_list_heart["week3"]) {
                new_time_week_list_heart["week3"] += 1;
              } else {
                new_time_week_list_heart["week3"] = 1
              }
            }

          } else {

            if (new_time_week_list_heart["week2"]) {
              new_time_week_list_heart["week2"] += 1;
            } else {
              new_time_week_list_heart["week2"] = 1
            }

          }

        } else {
          if (new_time_week_list_heart["week1"]) {
            new_time_week_list_heart["week1"] += 1;
          } else {
            new_time_week_list_heart["week1"] = 1
          }
        }
      }
    }


    var output_heart = Object.entries(new_time_week_list_heart).map(([week, heart_analysis]) => ({ week, heart_analysis }));


    const graphLiverTimeStampList = await authCannister.readProfileDataTimeStamps();

    let new_list_liver = [];

    for (let timeStamp in graphLiverTimeStampList) {
      new_list_liver.push(new Date(Number(graphLiverTimeStampList[timeStamp]) / 1000000))
    }


    let new_time_week_list_liver = {};


    for (let time in new_list_liver) {

      let dateSixWeeksAgo = new Date();

      dateSixWeeksAgo.setDate(dateToday.getDate() - 42);

      let dateComparator = dateSixWeeksAgo;

      if (new_list_liver[time] > dateComparator) {  // greater than week 1

        dateComparator.setDate(dateComparator.getDate() + 7);

        if (new_list_liver[time] > dateComparator) {  // greater than week 2

          dateComparator.setDate(dateComparator.getDate() + 7);

          if (new_list_liver[time] > dateComparator) {  // greater than week 3

            dateComparator.setDate(dateComparator.getDate() + 7);

            if (new_list_liver[time] > dateComparator) {  // greater than week 4

              dateComparator.setDate(dateComparator.getDate() + 7);

              if (new_list_liver[time] > dateComparator) {  // greater than week 5

                dateComparator.setDate(dateComparator.getDate() + 7);

                if (new_list_liver[time] > dateComparator) {  // greater than week 6

                  if (new_list_liver[time] < dateToday) {  // less than today
                    if (new_time_week_list_liver["week6"]) {
                      new_time_week_list_liver["week6"] += 1;
                    } else {
                      new_time_week_list_liver["week6"] = 1
                    }
                  }
                } else {
                  if (new_time_week_list_liver["week5"]) {
                    new_time_week_list_liver["week5"] += 1;
                  } else {
                    new_time_week_list_liver["week5"] = 1
                  }
                }
              } else {
                if (new_time_week_list_liver["week4"]) {
                  new_time_week_list_liver["week4"] += 1;
                } else {
                  new_time_week_list_liver["week4"] = 1
                }
              }
            } else {
              if (new_time_week_list_liver["week3"]) {
                new_time_week_list_liver["week3"] += 1;
              } else {
                new_time_week_list_liver["week3"] = 1
              }
            }

          } else {

            if (new_time_week_list_liver["week2"]) {
              new_time_week_list_liver["week2"] += 1;
            } else {
              new_time_week_list_liver["week2"] = 1
            }

          }

        } else {
          if (new_time_week_list_liver["week1"]) {
            new_time_week_list_liver["week1"] += 1;
          } else {
            new_time_week_list_liver["week1"] = 1
          }
        }
      }
    }


    var output_liver = Object.entries(new_time_week_list_liver).map(([week, liver_analysis]) => ({ week, liver_analysis }));



    let arr3 = output_heart.map((item, i) => Object.assign({}, item, output_liver[i]));

    console.log(arr3);






    dispatch({
      type: 'get_ai_graph_time_stamp',
      payload: { aiGraphTimeStamps: arr3 },
    })
  }
} 