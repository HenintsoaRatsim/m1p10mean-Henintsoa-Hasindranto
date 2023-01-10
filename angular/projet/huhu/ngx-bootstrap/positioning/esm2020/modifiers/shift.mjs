export function shift(data) {
    const placement = data.placement;
    const basePlacement = placement.split(' ')[0];
    const shiftVariation = placement.split(' ')[1];
    if (shiftVariation) {
        const { host, target } = data.offsets;
        const isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
        const side = isVertical ? 'left' : 'top';
        const measurement = isVertical ? 'width' : 'height';
        const shiftOffsets = {
            start: { [side]: host[side] },
            end: {
                [side]: (host[side] ?? 0) + host[measurement] - target[measurement]
            }
        };
        data.offsets.target = {
            ...target, ...{
                [side]: (side === shiftVariation ? shiftOffsets.start[side] : shiftOffsets.end[side])
            }
        };
    }
    return data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcG9zaXRpb25pbmcvbW9kaWZpZXJzL3NoaWZ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sVUFBVSxLQUFLLENBQUMsSUFBVTtJQUM5QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2pDLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvQyxJQUFJLGNBQWMsRUFBRTtRQUNsQixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDekMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUVwRCxNQUFNLFlBQVksR0FBRztZQUNuQixLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QixHQUFHLEVBQUU7Z0JBQ0gsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQzthQUNwRTtTQUNGLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRztZQUNwQixHQUFHLE1BQU0sRUFBRSxHQUFHO2dCQUNaLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RGO1NBQ0YsQ0FBQztLQUNIO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YSB9IGZyb20gJy4uL21vZGVscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGlmdChkYXRhOiBEYXRhKTogRGF0YSB7XG4gIGNvbnN0IHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuICBjb25zdCBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCcgJylbMF07XG4gIGNvbnN0IHNoaWZ0VmFyaWF0aW9uID0gcGxhY2VtZW50LnNwbGl0KCcgJylbMV07XG5cbiAgaWYgKHNoaWZ0VmFyaWF0aW9uKSB7XG4gICAgY29uc3QgeyBob3N0LCB0YXJnZXQgfSA9IGRhdGEub2Zmc2V0cztcbiAgICBjb25zdCBpc1ZlcnRpY2FsID0gWydib3R0b20nLCAndG9wJ10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG4gICAgY29uc3Qgc2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgICBjb25zdCBtZWFzdXJlbWVudCA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG5cbiAgICBjb25zdCBzaGlmdE9mZnNldHMgPSB7XG4gICAgICBzdGFydDogeyBbc2lkZV06IGhvc3Rbc2lkZV0gfSxcbiAgICAgIGVuZDoge1xuICAgICAgICBbc2lkZV06IChob3N0W3NpZGVdID8/IDApICsgaG9zdFttZWFzdXJlbWVudF0gLSB0YXJnZXRbbWVhc3VyZW1lbnRdXG4gICAgICB9XG4gICAgfTtcblxuICAgIGRhdGEub2Zmc2V0cy50YXJnZXQgPSB7XG4gICAgICAuLi50YXJnZXQsIC4uLntcbiAgICAgICAgW3NpZGVdOiAoc2lkZSA9PT0gc2hpZnRWYXJpYXRpb24gPyBzaGlmdE9mZnNldHMuc3RhcnRbc2lkZV0gOiBzaGlmdE9mZnNldHMuZW5kW3NpZGVdKVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cbiJdfQ==