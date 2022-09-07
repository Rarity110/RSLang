import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, LinearProgress, Typography } from '@mui/material';
import { DayStatistics } from '../../types/api';
import { getStatistics } from '../API/api';
import { getDay } from '../../utility/utility';

const Statistics = () => {
  const [stats, setStats] = useState<null | DayStatistics>(null);

  useEffect(() => {
    (async () => {
      const allStats = await getStatistics();

      if (allStats) {
        const daysStats = allStats.optional;
        const day = getDay(new Date());

        if (daysStats && daysStats[day]) {
          setStats(daysStats[day]);
        }
      }
    })();
  }, []);

  return (
    <Container>
      <Typography variant="h4" color="primary" mt={4}>
        Статистика за день
      </Typography>

      <Grid container rowSpacing={4} columnSpacing={{ xs: 0, sm: 4, md: 6 }} mt={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Аудиовызов
              </Typography>
              {!stats && (
                <Box pt={6} pb={4} display="flex" justifyContent="center">
                  <Typography variant="body2" color="text.secondary">
                    За сегодня ничего нет
                  </Typography>
                </Box>
              )}

              {stats && (
                <>
                  <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                    <Typography variant="body2" color="text.secondary">
                      Новых слов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {stats.audio.newWords}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                    <Typography variant="body2" color="text.secondary">
                      Серия правильных ответов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {stats.audio.rowCorrect}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                    mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Процент правильных ответов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {(stats.audio.correct * 100) /
                        (stats.audio.correct + stats.audio.incorrect) || 0}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (stats.audio.correct * 100) / (stats.audio.correct + stats.audio.incorrect) ||
                      0
                    }
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Спринт
              </Typography>
              {!stats && (
                <Box pt={6} pb={4} display="flex" justifyContent="center">
                  <Typography variant="body2" color="text.secondary">
                    За сегодня ничего нет
                  </Typography>
                </Box>
              )}

              {stats && (
                <>
                  <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                    <Typography variant="body2" color="text.secondary">
                      Новых слов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {stats.sprint.newWords}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                    <Typography variant="body2" color="text.secondary">
                      Серия правильных ответов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {stats.sprint.rowCorrect}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                    mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Процент правильных ответов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {(stats.sprint.correct * 100) /
                        (stats.sprint.correct + stats.sprint.incorrect) || 0}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (stats.sprint.correct * 100) /
                        (stats.sprint.correct + stats.sprint.incorrect) || 0
                    }
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                По словам
              </Typography>
              {!stats && (
                <Box pt={6} pb={4} display="flex" justifyContent="center">
                  <Typography variant="body2" color="text.secondary">
                    За сегодня ничего нет
                  </Typography>
                </Box>
              )}

              {stats && (
                <>
                  <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                    <Typography variant="body2" color="text.secondary">
                      Новых слов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {stats.audio.newWords + stats.sprint.newWords}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                    <Typography variant="body2" color="text.secondary">
                      Изученных слов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {stats.learnWords}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                    mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Процент правильных ответов
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {((stats.audio.correct + stats.sprint.correct) * 100) /
                        (stats.audio.correct +
                          stats.audio.incorrect +
                          stats.sprint.correct +
                          stats.sprint.incorrect)}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      ((stats.audio.correct + stats.sprint.correct) * 100) /
                      (stats.audio.correct +
                        stats.audio.incorrect +
                        stats.sprint.correct +
                        stats.sprint.incorrect)
                    }
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mb={4} />
    </Container>
  );
};

export default Statistics;
