package com.planetwise.greenscores.dto;

import com.planetwise.greenscores.model.GreenScores;

public class DtoUtil {

    public static TrendsDto convertToDto(GreenScores g){

        return new TrendsDto(
                g.getMonth(),g.getYear(),g.getScore_value()
        );
    }
}
