package com.ssafy.howdoilook.domain.ootd.dto.request;

import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OotdSaveRequestDto {
    private Long userId;
    private Long order;
    private Map<SlotType, Long> slotIds = new HashMap<>();

//    public void setSlotId(SlotType slotType, Long id) {
//        slotIds.put(slotType, id);
//    }

    public Long getSlotId(SlotType slotType) {
        return slotIds.get(slotType);
    }
}
